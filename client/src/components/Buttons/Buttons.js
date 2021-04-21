import Button from './Button'
/**
 * @visibleName Default Buttons
 */

export const CancelButton = (props) => (
  <Button color={'secondary'} ariaLabel="Cancel" {...props}>
    Cancel
  </Button>
)

export const DeleteButton = (props) => (
  <Button color={'primary'} ariaLabel="Delete" {...props}>
    Delete
  </Button>
)

export const DeleteAccountButton = (props) => (
  <Button color={'primary'} ariaLabel="Delete Account" {...props}>
    Delete Account
  </Button>
)

export const SendEmailButton = (props) => (
  <Button color={'primary'} ariaLabel="Submit Email Adress" {...props}>
    Send
  </Button>
)

export const LoginButton = (props) => (
  <Button color={'secondary'} ariaLabel="Login" {...props}>
    Log in
  </Button>
)

export const LogoutButton = (props) => (
  <Button color={'primary'} ariaLabel="Logout" {...props}>
    Log out
  </Button>
)

export const RegisterButton = (props) => (
  <Button color={'secondary'} ariaLabel="Register" {...props}>
    Register
  </Button>
)

export const ResetButton = (props) => (
  <Button color={'secondary'} ariaLabel="Reset" {...props}>
    Reset
  </Button>
)

export const SaveButton = (props) => (
  <Button color={'primary'} ariaLabel="Save" {...props}>
    Save
  </Button>
)
