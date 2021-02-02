import { render, screen } from '@testing-library/react'
import InputPlaySong from './InputPlaySong'

describe('InputPlaySong', () => {
  test('renders checked checkbox', () => {
    render(<InputPlaySong isSongActive={true} updateAppState={() => {}} />)
    const checkbox = screen.getByRole('checkbox', {
      name: /play learning song/i,
      hidden: true,
    })
    expect(checkbox).toBeChecked()
  })
})
