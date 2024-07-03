import { DragEvent, ReactElement, useRef, useState } from "react"
import { useUpdateEffect } from "react-use"

interface DraggableListProps {
  initialItems: string[]
  onReorder: (newItems: string[]) => void
  customCard?: (item: string) => ReactElement
}

export const DraggableList: React.FC<DraggableListProps> = ({
  initialItems,
  customCard
}) => {
  const [items, setItems] = useState<string[]>(initialItems)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)

  const draggedItem = useRef<number | null>(null)

  const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
    draggedItem.current = index
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.display = "none"
      }
    }, 0)
  }

  const handleDragEnd = (e: DragEvent<HTMLLIElement>) => {
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.display = ""
      }
      draggedItem.current = null
      setPlaceholderIndex(null)
    }, 0)
  }

  const handleDragOver = (e: DragEvent<HTMLUListElement>) => {
    e.preventDefault()
    const afterElement = getDragAfterElement(e.clientY)

    if (draggedItem.current === null) return

    if (afterElement == null) {
      setPlaceholderIndex(items.length)
    } else {
      const afterElementIndex = items.findIndex(
        (item) => item === afterElement.id
      )
      if (afterElementIndex === -1) return
      if (afterElementIndex === placeholderIndex) return
      console.log(afterElementIndex)

      setPlaceholderIndex(afterElementIndex)
    }
  }

  const handleDrop = () => {
    if (draggedItem.current === null || placeholderIndex === null) return

    const currentItemIndex = draggedItem.current

    setItems((prevItems) => {
      const updatedItems = [...prevItems]
      const draggedItemContent = updatedItems.splice(currentItemIndex, 1)[0]
      updatedItems.splice(placeholderIndex, 0, draggedItemContent)
      return updatedItems
    })

    setPlaceholderIndex(null)
    draggedItem.current = null
  }

  const getDragAfterElement = (y: number): HTMLElement | null => {
    const draggableElements = [
      ...document.querySelectorAll(".draggable:not(.dragging)")
    ] as HTMLElement[]

    return draggableElements.reduce<HTMLElement | null>((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (
        offset < 0 &&
        offset >
          (closest
            ? closest.getBoundingClientRect().top
            : Number.NEGATIVE_INFINITY)
      ) {
        return child
      } else {
        return closest
      }
    }, null)
  }

  useUpdateEffect(() => {
    setItems(initialItems), [initialItems]
  })

  return (
    <div className="sortable-list">
      <ul id="sortable" onDragOver={handleDragOver} onDrop={handleDrop}>
        {items.map((item, index) => (
          <>
            {placeholderIndex === index && (
              <li className="placeholder" key="placeholder">
                {customCard ? customCard("Drop here") : "Drop here"}
              </li>
            )}
            <li
              id={item}
              key={index}
              draggable
              className={`draggable ${
                draggedItem.current === index ? "dragging" : ""
              }`}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
            >
              {customCard ? customCard(item) : item}
            </li>
          </>
        ))}
        {placeholderIndex === items.length && (
          <li className="placeholder" key="last-item">
            {customCard ? customCard("Drop here") : "Drop here"}
          </li>
        )}
      </ul>
    </div>
  )
}
