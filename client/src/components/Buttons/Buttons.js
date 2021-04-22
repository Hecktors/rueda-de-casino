import Button from './Button'
/**
 * @visibleName Default Buttons
 */

export const BlueButton = (props) => (
  <Button color={'secondary'} ariaLabel={props.text} {...props}>
    {props.text}
  </Button>
)

export const RedButton = (props) => (
  <Button color={'primary'} ariaLabel={props.text} {...props}>
    {props.text}
  </Button>
)

export const DeepRedButton = (props) => (
  <Button color={'warning'} ariaLabel={props.text} {...props}>
    {props.text}
  </Button>
)
