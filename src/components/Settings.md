```jsx
<Settings
  pensum={[
    {
      id: 'l1',
      name: 'beginner',
      moves: [
        {
          id: 1,
          name: 'la prima',
          steps: 2,
          filename: 'la_prima.mp3',
        },
        {
          id: 2,
          name: 'sombrero',
          steps: 2,
          filename: 'sombrero.mp3',
        },
      ],
    },
    {
      id: 'l2',
      name: 'intermediate',
      moves: [
        {
          id: 7,
          name: 'vacuna',
          steps: 4,
          filename: 'vacuna.mp3',
        },
        {
          id: 8,
          name: 'enchufla con la buricua',
          steps: 4,
          filename: 'enchufla_con_la_buricua.mp3',
        },
      ],
    },
  ]}
  selectedMoves={[
    {
      id: 1,
      name: 'la prima',
      steps: 2,
      filename: 'la_prima.mp3',
    },
  ]}
  updateSelectedMoves={() => {}}
/>
```
