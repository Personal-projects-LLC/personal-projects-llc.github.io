import { jest } from '@jest/globals';
import fs from 'fs/promises';
import { init } from '../init';
// import { loadPBSConfig } from '../../../core/config';

// Mock fs/promises
jest.mock('fs/promises');
const mockedFs = jest.mocked(fs);

// Mock core modules
jest.mock('../../../core/config');
// const mockedLoadConfig = jest.mocked(loadPBSConfig);

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('init command', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Reset console mocks
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();

    // Default mock implementations
    mockedFs.access.mockRejectedValue(new Error('File not found')); // Default to files not existing
    mockedFs.mkdir.mockResolvedValue(undefined);
    mockedFs.writeFile.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create config and directories when running for the first time', async () => {
    // Setup mocks
    mockedFs.access.mockRejectedValue(new Error('File not found'));

    // Execute init command
    await init();

    // Verify config file was written
    expect(mockedFs.writeFile).toHaveBeenCalledWith('pbs.config.json', expect.any(String), 'utf8');

    // Verify directories were created
    expect(mockedFs.mkdir).toHaveBeenCalledTimes(3);

    // Verify success messages
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining('Created PBS configuration')
    );
  });

  it('should skip creation if config already exists', async () => {
    // Setup mock to simulate existing config
    mockedFs.access.mockResolvedValue(undefined);

    // Execute init command
    await init();

    // Verify no files were written
    expect(mockedFs.writeFile).not.toHaveBeenCalled();

    // Verify skip message
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining('PBS config already exists')
    );
  });

  it('should handle errors appropriately', async () => {
    // Setup mock to throw error
    const testError = new Error('Test error');
    mockedFs.writeFile.mockRejectedValue(testError);

    // Mock process.exit to prevent test from actually exiting
    const mockExit = jest
      .spyOn(process, 'exit')
      .mockImplementation((code?: string | number | null) => {
        throw new Error(`Process exit with code: ${code}`);
      });

    // Execute init command and expect it to throw
    await expect(init()).rejects.toThrow();

    // Verify error was logged
    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining('Error initializing PBS:'),
      expect.any(Error)
    );

    // Verify process tried to exit with error code
    expect(mockExit).toHaveBeenCalledWith(1);

    // Cleanup
    mockExit.mockRestore();
  });
});
