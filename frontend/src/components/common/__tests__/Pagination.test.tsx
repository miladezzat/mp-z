import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from '../Pagination'

describe('Pagination Component', () => {
  it('renders pagination with correct page numbers', () => {
    const mockOnChange = jest.fn()

    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnChange} />)

    expect(screen.getByLabelText('pagination item 1 active')).toBeInTheDocument()
    expect(screen.getByLabelText('pagination item 5')).toBeInTheDocument()
  })

  it('calls onPageChange when page button is clicked', async () => {
    const mockOnChange = jest.fn()
    const user = userEvent.setup()

    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnChange} />)

    const page2Button = screen.getByText('2')
    await user.click(page2Button)

    expect(mockOnChange).toHaveBeenCalledWith(2)
  })

  it('disables previous button on first page', () => {
    const mockOnChange = jest.fn()

    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnChange} />)

    const previousButton = screen.getByLabelText('previous page button')
    expect(previousButton).toHaveAttribute('aria-disabled', 'true')
  })

  it('disables next button on last page', () => {
    const mockOnChange = jest.fn()

    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnChange} />)

    const nextButton = screen.getByLabelText('next page button')
    expect(nextButton).toHaveAttribute('aria-disabled', 'true')
  })
})
