export class AdminConstants {
  // ADMIN PAGE
  OPERATION_SUCCESS_SMTP_UPDATE: string = 'SMTP Settings successfully saved. ' +
    'You have to restart server in order to make changes work.';
  OPERATION_FAILED: string = 'Operation failed';
  OPERATION_FAILED_SMTP: string = 'Make sure all fields are filled out.';
  OPERATION_SUCCES_PROXY_SAVE: string = 'Proxy setting is successfully saved';
  OPERATION_FAILED_ROUTINGDOMAIN_ADD = 'Operation failed';
  OPERATION_SUCCESS_ROUTINGDOMAIN_ADD = 'Routing Domain is successfully saved';
  OPERATION_SUCCESS_PROXY_ADD = 'Proxy Setting is successfully saved';
  OPERATION_SUCCESS_ROUTINGDOMAIN_DELETE = 'Routing Domain is deleted';
  OPERATION_FAILED_ROUTINGDOMAIN_DELETE = 'You have to remove all dependent object ' +
    'before proceedingw with deletion.';
  OPERATION_SUCCESS_COPY = 'Copied..';
  OPERATION_SUCCESS_COPY_TEXT = 'ApiKey is copied';
  OPERATION_SUCCESS_APIKEY_GENERATE = 'ApiKey is generated successfully';
  OPERATION_FAILED_AUTH = 'At least one authorization option have to be picked';
  OPERATION_SUCCESS_AUTH = 'Authorization settings are saved';
  OPERATION_SUCCESS_PASSWORD_CHANGE = 'Password is successfully changed';
  OPERATION_SUCCESS_SCANNER_TEST = 'Test passed';
  OPERATION_SUCCESS_SCANNER_DELETE = 'Scanner is successfully deleted';
  OPERATION_SUCCESS_USER_BLOCK = 'User is blocked.';
  OPERATION_SUCCESS_USER_UNBLOCK = 'User is unblocked.';
  OPERATION_SUCCESS_USER_SAVE = 'User created.';
  OPERATION_SUCCESS_SCANNER_SAVE = 'Scanner is successfully saved.';
  OPERATION_SUCCESS_RFW_SAVE = 'RFW configuration is successfully saved.';
  TOAST_SUCCESS: string = 'Success';
  TOAST_FAILED: string = 'Failure';
  SCANNER_TYPE_FORTIFYSCA = 'Fortify SCA Rest API';
  SCANNER_TYPE_OPENVAS = 'OpenVAS';
  SCANNER_TYPE_NESSUS = 'Nessus';
  SCANNER_TYPE_ACUNETIX = 'Acunetix';
  USER_GROUPS: any = [
    {
      'name': 'Admin',
      'id': 'ROLE_ADMIN',
    },
    {
      'name': 'Viewer',
      'id': 'ROLE_USER',
    },
    {
      'name': 'Editor',
      'id': 'ROLE_EDITOR_RUNNER',
    },
  ];
  OPERATION_SUCCESS_PROXY_DELETE: string = 'Proxy is successfully deleted.';
  ADMIN_PAGE_TITLE: string = 'Admin panel';
  ADMIN_TAB_USERS: string = 'Users';
  ADMIN_TAB_SCANNERS: string = 'Scanners';
  ADMIN_TAB_SETTINGS: string = 'Settings';
  ADMIN_ADD_USER: string = 'Add user';
  ADMIN_ADD_SCANNER = 'Add scanner';
  ADMIN_USERTABLE_USERNAME = 'Username';
  ADMIN_USERTABLE_LASTIP = 'Last login IP';
  ADMIN_USERTABLE_ACTIVE = 'Active?';
  ADMIN_USERTABLE_ACTION = 'Actions';
  ADMIN_USERTABLE_COMMONNAME = 'CommonName';
  ADMIN_SCANNERTABLE_TYPE = 'Scanner Type';
  ADMIN_SCANNERTABLE_API_URL = 'API URL';
  ADMIN_SCANNERTABLE_ROUTINGDOMAIN = 'Routing Domain';
  ADMIN_SCANNERTABLE_ACTIVE = 'Active?';
  ADMIN_SCANNERTABLE_ACTION = 'Action';
  YES = 'Yes';
  NO = 'No';
  ADMIN_TOOLTIP_CHANGEPASSWORD = 'Change password';
  ADMIN_TOOLTIP_ACTIVATE_USER = 'Activate user';
  ADMIN_TOOLTIP_BLOCK_USER = 'Block user';
  ADMIN_TOOLTIP_SCANNER_DELETE = 'Delete scanner';
  ADMIN_TOOLTIP_SCANNER_TEST = 'Test configuration';
  ADMIN_TOOLTIP_SCANNER_RFW = 'Add RFW';
  ADMIN_AUTHENTICATION = 'Authentication';
  ADMIN_SMTP_CONFIG = 'SMTP configuration';
  ADMIN_MASTER_APIKEY = 'Global APIKEY';
  ADMIN_SCAN_STRATEGY = 'Test creation strategy';
  ADMIN_ROUTINGDOMAINS = 'Routing Domains';
  ADMIN_PROXXIES = 'Proxies';
  ADMIN_AUTHENTICATION_PASSWORD = 'Password Authentication';
  ADMIN_AUTHENTICATION_CERTIFICATE = 'X.509 Authentication';
  ADMIN_FORM_SAVE = 'Save';
  ADMIN_SMTP_HOSTNAME = 'Hostname';
  ADMIN_SMTP_PORT = 'Port';
  ADMIN_SMTP_USERNAME = 'Username';
  ADMIN_SMTP_PASSWORD = 'Password';
  ADMIN_SMTP_AUTH = 'Authentication';
  ADMIN_SMTP_TLS = 'TLS';
  ADMIN_TOOLTIP_COPY_APIKEY = 'Copy';
  ADMIN_TOOLTIP_GENERATE_APIKEY = 'Generate new ApiKey, old one will be disabled';
  ADMIN_TOOLTIP_DELETE_APIKEY = 'Delete ApiKey';
  ADMIN_STRATEGY_ONCE_PER_RD = 'One Scanner in Routing Domain';
  ADMIN_STRATEGY_N_PER_RD = 'Multiple Scanners in Routing Domain';
  ADMIN_STRATEGY_ALL_RD_SCAN = 'Scan performed on each avaliable scanners';
  ADMIN_STRATEGY_ONE_RD_SCAN = '';
  ADMIN_ADD_ROUTINGDOMAIN = 'Add Routing Domain';
  ADMIN_ADD_PROXY = 'Add Proxy';
  ADMIN_DELETE_ROUTINGDOMAIN = 'Delete Routing Domain';
  ADMIN_DELETE_PROXY = 'Delete Proxy';
  ADMIN_FORM_USER_TITLE = 'Adding user..';
  ADMIN_FORM_USER_NAME = 'Username';
  ADMIN_FORM_USER_PASSWORD_AUTH = 'Enable password authentication?';
  ADMIN_FORM_USER_PASSWORD = 'Password';
  ADMIN_FORM_ROLE = 'Role';
  ADMIN_FORM_COMMONNAME = 'CommonName';
  ADMIN_FORM_COMMONNAME_PLACEHOLDER = 'CommonName of x.509 certificate';
  ADMIN_FORM_SCANNER_TITLE = 'Adding scanner..';
  ADMIN_FORM_SCANNER_TYPE = 'Type';
  ADMIN_FORM_SCANNER_ROUTINGDOMAIN = 'Routing Domain';
  ADMIN_FORM_PROXY = 'Proxy';
  ADMIN_FORM_PROXY_NONE = 'None';
  ADMIN_FORM_SCANNER_APIURL = 'API URL';
  ADMIN_FORM_SCANNER_USERNAME = 'Username';
  ADMIN_FORM_SCANNER_PASSWORD = 'Password';
  ADMIN_FORM_SCANNER_ACCESSKEY = 'Access Key';
  ADMIN_FORM_SCANNER_SECRETKEY = 'Secret Key';
  ADMIN_FORM_SCANNER_APIKEY = 'API Key';
  ADMIN_FORM_SCANNER_CLOUDCTRL = 'Cloud Controller Token';
  ADMIN_FORM_RFW_TITLE = 'RFW Configuration';
  ADMIN_FORM_RFW_URL = 'API RFW';
  ADMIN_FORM_RFW_SCANNER_URL = 'IP of scanner behind RFW';
  ADMIN_FORM_RFW_USERNAME = 'Username';
  ADMIN_FORM_RFW_PASSWORD = 'Password';
  ADMIN_FORM_CHANGEPASSWORD_TITTLE = 'Change password for user';
  ADMIN_FORM_CHANGEPASSWORD_NEWPASS = 'New Password';
  ADMIN_FORM_ROUTINGDOMAIN_TITLE = 'Add New Routing Domain';
  ADMIN_FORM_ROUTINGDOMAIN_NAME = 'Routing Domain name';
  ADMIN_FORM_PROXY_TITLE = 'Add New Proxy';
  ADMIN_FORM_PROXY_IP = 'IP Address';
  ADMIN_FORM_PROXY_PORT = 'Port';
  ADMIN_FORM_PROXY_DESC = 'Description';
  ADMIN_FORM_PROXY_USERNAME = 'Username';
  ADMIN_FORM_PROXY_PASSWORD = 'Password';
  OPERATION_SUCCESS_APIKEY_DELETE = 'ApiKey is successfully delated, access is revoked';
}
