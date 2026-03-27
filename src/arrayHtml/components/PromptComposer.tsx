import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

type NativeFileDropItem = {
  files?: File[]
}

type PromptComposerProps = {
  variant: 'full' | 'compact'
  value: string
  onChange?: (value: string) => void
  onSend: () => void
  placeholder?: string
  allowDocuments?: boolean
  uploadedDocument?: File | null
  onDocumentSelect?: (file: File | null) => void
  readOnly?: boolean
}

export const PromptComposer = ({
  variant,
  value,
  onChange,
  onSend,
  placeholder,
  allowDocuments = false,
  uploadedDocument = null,
  onDocumentSelect,
  readOnly = false,
}: PromptComposerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop: (item: unknown) => {
        if (!allowDocuments || !onDocumentSelect) return
        const droppedItem = item as NativeFileDropItem
        const firstFile = droppedItem.files?.[0] ?? null
        if (firstFile) onDocumentSelect(firstFile)
      },
      collect: (monitor) => ({
        isOver: allowDocuments ? monitor.isOver({ shallow: true }) : false,
      }),
    }),
    [allowDocuments, onDocumentSelect],
  )

  const handleClipClick = () => {
    if (!allowDocuments) return
    fileInputRef.current?.click()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!allowDocuments || !onDocumentSelect) return
    const firstFile = event.target.files?.[0] ?? null
    onDocumentSelect(firstFile)
    event.target.value = ''
  }

  if (variant === 'compact') {
    return (
      <div className="rounded-2xl bg-white shadow-md ring-1 ring-[#DED1F8]">
        <div className="flex items-center gap-2 px-4 py-2.5">
          <input
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={(event) => onChange?.(event.target.value)}
            className="w-full border-0 bg-transparent text-base text-slate-500 outline-none"
          />
          <button
            type="button"
            onClick={onSend}
            className="btn-elevate flex h-9 w-9 aspect-[1/1] cursor-pointer items-center justify-center rounded-full bg-[#2A107E] text-white shadow-md"
          >
            <img src="/assets/icon-search-field-arrow.svg" alt="" className="h-[13px] w-[17px] select-none" draggable={false} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={(node) => {
        dropRef(node)
      }}
      className={`rounded-2xl bg-white p-0.5 shadow-md ring-1 ${isOver ? 'ring-[#2A107E]' : 'ring-[#DED1F8]'}`}
    >
      <textarea
        className="h-[120px] w-full resize-none rounded-t-2xl border-0 bg-transparent px-4 py-3 text-base text-slate-700 outline-none"
        value={value}
        onInput={(e) => onChange?.((e.target as HTMLTextAreaElement).value)}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      {uploadedDocument ? <p className="px-4 pb-2 text-xs text-[#2A107E]">Documento seleccionado: {uploadedDocument.name}</p> : null}
      <div className="flex items-center justify-between rounded-b-2xl border-t border-[#ECE5FB] px-4 py-2.5">
        <button type="button" onClick={handleClipClick} aria-label="Subir documento" className="btn-elevate cursor-pointer">
          <img src="/assets/icon-upload-clip.svg" alt="" className="h-4 w-[17px] select-none" draggable={false} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          accept=".pdf,.doc,.docx,.txt,.rtf,.md"
        />
        <button
          type="button"
          onClick={onSend}
          className="btn-elevate flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#2A107E] text-white shadow-md"
        >
          <img src="/assets/icon-search-field-arrow.svg" alt="" className="h-[13px] w-[17px] select-none" draggable={false} />
        </button>
      </div>
    </div>
  )
}

