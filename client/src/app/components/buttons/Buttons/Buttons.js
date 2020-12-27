import Button from './Button'
/**
 * @visibleName Default Buttons
 */

export const CancelButton = (props) => (
  <Button color={'secondary'} {...props}>
    Cancel
  </Button>
)

export const LoginButton = (props) => (
  <Button color={'secondary'} {...props}>
    Log in
  </Button>
)

export const LogoutButton = (props) => (
  <Button color={'secondary'} {...props}>
    Log out
  </Button>
)

export const MsgButton = (props) => (
  <Button color={'primary'} {...props}>
    Clear
  </Button>
)

export const RegisterButton = (props) => (
  <Button color={'secondary'} {...props}>
    Register
  </Button>
)

export const SaveButton = (props) => (
  <Button color={'primary'} {...props}>
    Save
  </Button>
)
