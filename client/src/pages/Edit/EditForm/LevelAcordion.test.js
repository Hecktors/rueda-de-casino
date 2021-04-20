import { render, screen } from '@testing-library/react'
import LevelAccordion from './LevelAccordion'

const propsMock = {
  selectedLevelName: 'current Level',
  levels: [{ name: 'Level A' }, { name: 'Level B' }],
  isNewLevel: false,
  updateUserInput: () => {},
}
describe('LevelAccordion', () => {
  test('', () => {
    render(<LevelAccordion {...propsMock} />)
    const heading = screen.getByRole('heading', { name: /current level/i })
    expect(heading).toBeInTheDocument()
    const unorderedList = screen.getByRole('list')
    expect(unorderedList).toBeInTheDocument()
    const checkbox1 = screen.getByLabelText(/level a/i)
    expect(checkbox1).toBeInTheDocument()
    const checkbox2 = screen.getByLabelText(/level b/i)
    expect(checkbox2).toBeInTheDocument()
  })
})
