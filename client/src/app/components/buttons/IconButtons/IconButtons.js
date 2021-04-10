import IconButton from './IconButton'
import {
  AddIcon,
  BackIcon,
  CancelIcon,
  DeleteIcon,
  EditIcon,
  HomeIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
  SettingsIcon,
  UserIcon,
} from '../../Icons'

/**
 * @visibleName IconButtons
 */

export const AddIconButton = (props) => (
  <IconButton ariaLabel="Add" {...props}>
    <AddIcon />
  </IconButton>
)

export const BackIconButton = (props) => (
  <IconButton ariaLabel="Back" {...props}>
    <BackIcon />
  </IconButton>
)

export const CancelIconButton = (props) => (
  <IconButton ariaLabel="Cancel" {...props}>
    <CancelIcon />
  </IconButton>
)

export const DeleteIconButton = (props) => (
  <IconButton ariaLabel="Delete" {...props}>
    <DeleteIcon />
  </IconButton>
)

export const EditIconButton = (props) => (
  <IconButton ariaLabel="Edit" {...props}>
    <EditIcon />
  </IconButton>
)

export const HomeIconButton = (props) => (
  <IconButton ariaLabel="Home" {...props}>
    <HomeIcon />
  </IconButton>
)

export const PauseIconButton = (props) => (
  <IconButton ariaLabel="Pause" {...props}>
    <PauseIcon />
  </IconButton>
)

export const PlayIconButton = (props) => (
  <IconButton ariaLabel="Play" {...props}>
    <PlayIcon />
  </IconButton>
)

export const ResetIconButton = (props) => (
  <IconButton ariaLabel="Reset" {...props}>
    <ResetIcon />
  </IconButton>
)

export const SettingsIconButton = (props) => (
  <IconButton ariaLabel="Settings" {...props}>
    <SettingsIcon />
  </IconButton>
)

export const UserIconButton = (props) => (
  <IconButton ariaLabel="User Account" {...props}>
    <UserIcon />
  </IconButton>
)
