export enum Events {
  // User flow
  SCREEN = 'Screen', // use-screen-change-listeners

  // Settings
  OPEN_HOME = 'Open Home', // Home
  CHANGE_LANGUAGE = 'Change Language', // use-change-language
  CHANGE_THEME = 'Change Theme', // use-change-theme

  LOGOUT = 'Logout', // logout

  // App metrics
  SESSION = 'Session', // use-session-analytics
  PERFORMANCE_METRICS = 'Performance Metrics', // use-performance-analytics

  // Wallet Connect actions
  WC_SESSION_ACCEPT = 'WalletConnect Session Accept', // wallet-connect/modal
  WC_SESSION_DENY = 'WalletConnect Session Deny', // wallet-connect/modal
  WC_REQUEST_ACCEPT = 'WalletConnect Request Accept', // wallet-connect/modal
  WC_REQUEST_DENY = 'WalletConnect Request Deny', // wallet-connect/modal
  WC_DISCONNECT = 'WalletConnect Disconnect',
  WC_CHANGE_NETWORK = 'WalletConnect Change Network', // wallet-connect/modal | dapp-wrapper
  WC_CHANGE_ACCOUNT = 'WalletConnect Change Account', // wallet-connect/modal | dapp-wrapper

  // Web3 actions
  SEND_SUCCESS = 'Send Success', // send/SendPreview
  SEND_ERROR = 'Send Error', // send/SendPreview
  BRIDGE_SUCCESS = 'Bridge Success', // SubmittedTxScreen
  BRIDGE_ERROR = 'Bridge Error', // SubmittedTxScreen
}
