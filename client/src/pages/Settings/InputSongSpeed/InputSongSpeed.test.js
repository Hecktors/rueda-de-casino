import { render, screen } from '@testing-library/react'
import InputSongSpeed from './InputSongSpeed'

describe('InputSongSpeed', () => {
  test('range input appears and adopt value', () => {
    render(<InputSongSpeed speed="2100" updateAppState={() => {}} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('2100')
  })
})
