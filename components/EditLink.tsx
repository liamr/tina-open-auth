import { EditIcon } from '@tinacms/icons'
import { useCMS } from 'tinacms'

export const EditLink = () => {
  const cms = useCMS()

  return (
    <button className="flex items-center px-2 py-1 bg-gray-300 rounded" onClick={cms.toggle}>
      <EditIcon /> {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
