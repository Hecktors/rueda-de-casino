```jsx
import {
  HomeIconButton,
  SettingsIconButton,
  EditIconButton,
  UserIconButton,
  PlayIconButton,
  PauseIconButton,
  ResetIconButton,
  BackIconButton,
  CancelIconButton,
  AddIconButton,
  DeleteIconButton,
} from './IconButtons.js'
;<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
  <HomeIconButton size={'md'} />
  <SettingsIconButton size={'md'} />
  <EditIconButton size={'md'} />
  <UserIconButton size={'md'} />
  <PlayIconButton size={'xl'} primary />
  <PlayIconButton size={'xl'} primary disabled />
  <PauseIconButton size={'xl'} primary />
  <AddIconButton size={'lg'} />
  <BackIconButton size={'md'} />
  <ResetIconButton size={'md'} />
  <ResetIconButton size={'md'} disabled />
  <DeleteIconButton size={'md'} />
  <CancelIconButton size={'md'} primary />
  <AddIconButton size={'sm'} />
  <EditIconButton size={'xs'} />
</div>
```
