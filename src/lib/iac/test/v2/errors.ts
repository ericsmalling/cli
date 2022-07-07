import { CustomError } from '../../../errors';
import { ScanError } from './scan/results';

const defaultUserMessage =
  'Your test request could not be completed. Please run the command again with the `-d` flag and contact support@snyk.io with the contents of the output';

enum SnykIacTestErrors {
  errorCodeNoPaths = 2000,
  errorCodeCwdTraversal = 2003,
  errorCodeNoBundle = 2004,
  errorCodeOpenBundle = 2005,
  errorCodeScan = 2100,
  errorCodeUnableToRecognizeInputType = 2101,
  errorCodeUnsupportedInputType = 2102,
  errorCodeUnableToResolveLocation = 2103,
  errorCodeUnrecognizedFileExtension = 2104,
  errorCodeFailedToParseInput = 2105,
  errorCodeInvalidInput = 2106,
  errorCodeUnableToReadFile = 2107,
  errorCodeUnableToReadDir = 2108,
  errorCodeUnableToReadStdin = 2109,
  errorCodeFailedToLoadRegoAPI = 2110,
  errorCodeFailedToLoadRules = 2111,
  errorCodeFailedToCompile = 2112,
  errorCodeUnableToReadPath = 2113,
  errorCodeNoLoadableInput = 2114,
}

const snykIacTestErrorsUserMessages = {
  errorCodeNoPaths: 'No valid paths were provided',
  errorCodeCwdTraversal:
    'Running the scan from outside of the current working directory is not supported',
  errorCodeNoBundle: 'A rules bundle were not provided',
  errorCodeOpenBundle: "The Snyk CLI couldn't open the rules bundle",
  errorCodeScan: defaultUserMessage,
  errorCodeUnableToRecognizeInputType: 'Input type was not recognized',
  errorCodeUnsupportedInputType: 'Input type is not supported',
  errorCodeUnableToResolveLocation:
    'Could not resolve location of resource/attribute',
  errorCodeUnrecognizedFileExtension: 'Unrecognized file extension',
  errorCodeFailedToParseInput: 'Failed to parse input',
  errorCodeInvalidInput: 'Invalid input',
  errorCodeUnableToReadFile: 'Unable to read file',
  errorCodeUnableToReadDir: 'Unable to read directory',
  errorCodeUnableToReadStdin: 'Unable to read stdin',
  errorCodeFailedToLoadRegoAPI: defaultUserMessage,
  errorCodeFailedToLoadRules: defaultUserMessage,
  errorCodeFailedToCompile: defaultUserMessage,
  errorCodeUnableToReadPath: 'Unable to read path',
  errorCodeNoLoadableInput:
    "The Snyk CLI couldn't find any valid IaC configuration files to scan",
};

function getErrorStringCode(code: number): string {
  const errorName = SnykIacTestErrors[code];
  if (!errorName) {
    return 'INVALID_IAC_ERROR';
  }
  let result = errorName.replace(/([A-Z])/g, '_$1');
  if (result.charAt(0) === '_') {
    result = result.substring(1);
  }
  return result.toUpperCase();
}

function getErrorUserMessage(code: number): string {
  const errorName = SnykIacTestErrors[code];
  if (!errorName) {
    return 'INVALID_IAC_ERROR';
  }
  return snykIacTestErrorsUserMessages[errorName];
}

export class SnykIacTestError extends CustomError {
  constructor(error: ScanError) {
    super(error.message);
    this.code = error.code;
    this.strCode = getErrorStringCode(this.code);
    this.userMessage = getErrorUserMessage(this.code);
  }
}
