import Button from './Button'
/**
 * @visibleName Default Buttons
 */

export const SaveButton = (props) => (
  <Button color={'primary'} {...props}>
    Save
  </Button>
)

export const CancelButton = (props) => (
  <Button outlined type={'button'} color={'secondary'} {...props}>
    Cancel
  </Button>
)
