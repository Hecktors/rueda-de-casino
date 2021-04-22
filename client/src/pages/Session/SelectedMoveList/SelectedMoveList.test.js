import SelectedMoveList from './SelectedMoveList'
import { render, screen } from '@testing-library/react'
const movesMock = [
  {
    _id: 1,
    name: 'la prima',
  },
  {
    _id: 2,
    name: 'sombrero',
  },
]

describe('SelectedMoveList', () => {
  it('shows move names and youtube icons', () => {
    render(<SelectedMoveList moves={movesMock} />)
    const svg = screen.getAllByTitle(/youtube/i)
    const button1 = screen.getByRole('button', { name: /la prima/i })
    const button2 = screen.getByRole('button', { name: /sombrero/i })
    expect(button1).toBeInTheDocument()
    expect(button1).toContainElement(svg[0])
    expect(button2).toBeInTheDocument()
    expect(button2).toContainElement(svg[1])
  })
})
