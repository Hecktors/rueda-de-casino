```jsx
const moves = [
  {
    id: 'm1',
    name: 'la prima',
    bars: 2,
    filename: 'la_prima.mp3',
    videoUrl: 'test',
    videoStart: '20',
  },
  {
    id: 'm2',
    name: 'sombrero',
    bars: 2,
    filename: 'sombrero.mp3',
    videoUrl: 'test',
    videoStart: '1',
  },
  {
    id: 'm3',
    name: 'sombrero con una mano',
    bars: 2,
    filename: 'sombrero_con_una_mano.mp3',
    videoUrl: 'test',
    videoStart: '1',
  },
  {
    id: 'm4',
    name: 'doble play',
    bars: 3,
    filename: 'doble_play.mp3',
    videoUrl: 'test',
    videoStart: '1',
  },
  {
    id: 'm5',
    name: 'setenta',
    bars: 4,
    filename: 'setenta.mp3',
    videoUrl: 'test',
    videoStart: '1',
  },
  {
    id: 'm6',
    name: 'métele el dedo',
    bars: 4,
    filename: 'metele_el_dedo.mp3',
    videoUrl: '',
    videoStart: '',
  },
]
;<div>
  <SelectedMoveList moves={moves} onClick={() => {}} />
</div>
```
