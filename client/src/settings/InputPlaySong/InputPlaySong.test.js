import { render, screen } from '@testing-library/react'
import InputPlaySong from './InputPlaySong'

describe('InputPlaySong', () => {
  test('renders checked checkbox', () => {
    render(<InputPlaySong isSongActive={true} updateAppState={() => {}} />)
    const checkbox = screen.getByRole('checkbox', {
      hidden: true,
    })
    expect(checkbox).toBeChecked()
  })
})
