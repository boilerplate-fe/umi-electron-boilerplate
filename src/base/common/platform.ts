let _isWindows = false;
let _isMacintosh = false;
let _isLinux = false;
let _isNative = false;
let _isWeb = false;
let _isIOS = false;
let _userAgent: string | undefined;

export interface IProcessEnvironment {
  [key: string]: string;
}

interface INodeProcess {
  nextTick: Function;
  platform: string;
  env: IProcessEnvironment;
  versions?: {
    electron?: string;
  };
  type?: string;
  getuid(): number;
}
declare const process: INodeProcess;

interface INavigator {
  userAgent: string;
  language: string;
  maxTouchPoints?: number;
}
declare const navigator: INavigator;

const isElectronRenderer =
  typeof process !== 'undefined' &&
  typeof process.versions !== 'undefined' &&
  typeof process.versions.electron !== 'undefined' &&
  process.type === 'renderer';

// OS detection
if (typeof navigator === 'object' && !isElectronRenderer) {
  _userAgent = navigator.userAgent;
  _isWindows = _userAgent.indexOf('Windows') >= 0;
  _isMacintosh = _userAgent.indexOf('Macintosh') >= 0;
  _isIOS =
    _userAgent.indexOf('Macintosh') >= 0 &&
    !!navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 0;
  _isLinux = _userAgent.indexOf('Linux') >= 0;
  _isWeb = true;
} else if (typeof process === 'object') {
  _isWindows = process.platform === 'win32';
  _isMacintosh = process.platform === 'darwin';
  _isLinux = process.platform === 'linux';
  _isNative = true;
}

export const enum Platform {
  Web,
  Mac,
  Linux,
  Windows,
}

export function PlatformToString(platform: Platform) {
  switch (platform) {
    case Platform.Web:
      return 'Web';
    case Platform.Mac:
      return 'Mac';
    case Platform.Linux:
      return 'Linux';
    case Platform.Windows:
      return 'Windows';
    default:
      return 'Mac';
  }
}

let _platform: Platform = Platform.Web;
if (_isMacintosh) {
  _platform = Platform.Mac;
} else if (_isWindows) {
  _platform = Platform.Windows;
} else if (_isLinux) {
  _platform = Platform.Linux;
}

export const isWindows = _isWindows;
export const isMacintosh = _isMacintosh;
export const isLinux = _isLinux;
export const isNative = _isNative;
export const isWeb = _isWeb;
export const isIOS = _isIOS;
export const platform = _platform;
export const userAgent = _userAgent;

export const enum OperatingSystem {
  Windows = 1,
  Macintosh = 2,
  Linux = 3,
}
export const OS = _isMacintosh
  ? OperatingSystem.Macintosh
  : _isWindows
  ? OperatingSystem.Windows
  : OperatingSystem.Linux;

export const dev = process.env.NODE_ENV !== 'production';
