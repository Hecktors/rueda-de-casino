import { render, screen } from '@testing-library/react'
import InputRunThroughSelection from './InputRunThroughSelection'

describe('InputPlaySong', () => {
  test('renders checked checkbox', () => {
    render(
      <InputRunThroughSelection noRepetition={true} updateAppState={() => {}} />
    )
    const checkbox = screen.getByRole('checkbox', { hidden: true })
    expect(checkbox).toBeChecked()
  })
})
