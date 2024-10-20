/* eslint-disable */
import {
  type DragEvent,
  type ReactElement,
  useCallback,
  useRef,
  useState
} from "react"
import { useUpdateEffect } from "react-use"

interface DraggableListProps {
  initialItems: string[]
  onReorder: (newItems: string[]) => void
  customCard?: (item: string) => ReactElement
}

export function DraggableList(props: DraggableListProps) {
  const { initialItems, onReorder, customCard } = props
  const [items, setItems] = useState<string[]>(initialItems)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)
  const draggedItem = useRef<number | null>(null)

  const handleDragStart = useCallback(
    (e: DragEvent<HTMLLIElement>, index: number) => {
      draggedItem.current = index
      setTimeout(() => {
        if (e.target instanceof HTMLElement) {
          e.target.style.display = "none"
        }
      }, 0)
    },
    []
  )

  const handleDragEnd = useCallback((e: DragEvent<HTMLLIElement>) => {
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.display = ""
      }
      draggedItem.current = null
      setPlaceholderIndex(null)
    }, 0)
  }, [])

  const getDragAfterElement = useCallback((y: number): Element | null => {
    const draggableElements = Array.from(
      document.querySelectorAll(".draggable:not(.dragging)")
    )

    return draggableElements.reduce<Element | null>((closest, child) => {
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
  }, [])

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLUListElement>) => {
      e.preventDefault()
      const afterElement = getDragAfterElement(e.clientY)

      if (draggedItem.current === null) return

      if (afterElement == null) {
        setPlaceholderIndex(items.length)
      } else {
        const afterElementIndex = items.findIndex(
          (item) => item === afterElement.id
        )

        if (afterElementIndex === -1 || afterElementIndex === placeholderIndex)
          return
        setPlaceholderIndex(afterElementIndex)
      }
    },
    [getDragAfterElement, items, placeholderIndex]
  )

  const handleDrop = useCallback(() => {
    if (draggedItem.current === null || placeholderIndex === null) return

    const currentItemIndex = draggedItem.current
    const updatedItems = [...items]
    const [draggedItemContent] = updatedItems.splice(currentItemIndex, 1)

    updatedItems.splice(placeholderIndex, 0, draggedItemContent)

    setItems(updatedItems)
    onReorder(updatedItems)

    setPlaceholderIndex(null)
    draggedItem.current = null
  }, [items, onReorder, placeholderIndex])

  useUpdateEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  return (
    <div className="sortable-list">
      <ul id="sortable" onDragOver={handleDragOver} onDrop={handleDrop}>
        {items.map((item, index) => (
          <div key={item}>
            {placeholderIndex === index && (
              <li key="placeholder" className="placeholder">
                {customCard ? customCard("Drop here") : "Drop here"}
              </li>
            )}
            <li
              key={item}
              draggable
              className={`draggable ${
                draggedItem.current === index ? "dragging" : ""
              }`}
              id={item}
              onDragEnd={handleDragEnd}
              onDragStart={(e) => handleDragStart(e, index)}
            >
              {customCard ? customCard(item) : item}
            </li>
          </div>
        ))}
        {placeholderIndex === items.length && (
          <li key="last-item" className="placeholder">
            {customCard ? customCard("Drop here") : "Drop here"}
          </li>
        )}
      </ul>
    </div>
  )
}
