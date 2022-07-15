import Toast from 'components/popup/Toast'
import {FC} from 'react'
import {FaTrash} from 'react-icons/fa'
import {openToast} from 'store/popup/popup.reducer'
import {useAppDispatch} from 'hooks/redux'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import {CallInterface} from 'store/call/types/call.interface'

interface CallCardProps {
  call: CallInterface
}

const CallCard: FC<CallCardProps> = ({call}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/call/${call.phone}`)}
      className="bg-gray-50 cursor-pointer hover:bg-gray-200 p-3 px-6 flex items-center justify-between"
    >
      <Toast
        text="Delete call"
        phone={Number(call.phone)}
        name={call.name}
        call={2}
      />
      <div className="flex items-center">
        <div onClick={(e) => e.stopPropagation()} className="flex mr-5">
          <span className="font-bold italic mr-2">call name:</span>

          <h3>{call.name}</h3>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="flex mr-5">
          <span className="font-bold italic mr-2">phone number:</span>

          <h3>{call.phone}</h3>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="flex mr-5">
          <span className="font-bold italic mr-2">Called at:</span>

          <h3>{moment(call.created_at).format('YYYY-MM-DD  HH:mm:ss')}</h3>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center">
        <div
          onClick={(e) => {
            e.stopPropagation()
            dispatch(openToast(Number(call.phone)))
          }}
          className="h-8 cursor-pointer w-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center"
        >
          <FaTrash />
        </div>
      </div>
    </div>
  )
}

export default CallCard
