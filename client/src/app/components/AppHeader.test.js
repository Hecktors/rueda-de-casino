import { render, screen } from '@testing-library/react'
import AppHeader from './AppHeader'

describe('AppHeader', () => {
  test('header has title and 2 placeholer divs', () => {
    render(<AppHeader children={[<h1 key="1" role="title" />]} cols="010" />)

    const title = screen.getByRole('title')
    const placeholders = screen.getAllByRole('placeholder')
    expect(title).toBeInTheDocument()
    expect(placeholders).toHaveLength(2)
  })

  test('header has button, title and placeholder div', () => {
    render(
      <AppHeader
        children={[<button key="1" />, <h1 key="2" role="title" />]}
        cols="110"
      />
    )

    const button = screen.getByRole('button')
    const title = screen.getByRole('title')
    const placeholders = screen.getAllByRole('placeholder')
    expect(button).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(placeholders).toHaveLength(1)
  })

  test('header has placeholder div, button and title ', () => {
    render(
      <AppHeader
        children={[<h1 key="2" role="title" />, <button key="1" />]}
        cols="011"
      />
    )

    const button = screen.getByRole('button')
    const title = screen.getByRole('title')
    const placeholders = screen.getAllByRole('placeholder')
    expect(button).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(placeholders).toHaveLength(1)
  })

  test('header has 2 buttons, titel, and no placeholder div', () => {
    render(
      <AppHeader
        children={[
          <button key="1" />,
          <h1 key="2" role="title" />,
          <button key="3" />,
        ]}
        cols="111"
      />
    )

    const buttons = screen.getAllByRole('button')
    const title = screen.getByRole('title')
    const placeholders = screen.queryByRole('placeholder')
    expect(buttons).toHaveLength(2)
    expect(title).toBeInTheDocument()
    expect(placeholders).not.toBeInTheDocument()
  })

  test('header has 3 placeholder div', () => {
    render(<AppHeader children={[]} cols="000" />)

    const placeholders = screen.queryAllByRole('placeholder')
    expect(placeholders).toHaveLength(3)
  })
})
