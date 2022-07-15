import CallCard from 'components/call/CallCard'
import Loader from 'components/misc/Loader'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {FC, useEffect} from 'react'
import {findCalls} from 'store/call/call.action'

const Call: FC = () => {
  const {calls, isLoading, error} = useAppSelector((state) => state.call)
  const {user} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  console.log(calls)
  useEffect(() => {
    dispatch(findCalls())
  }, []) // eslint-disable-line

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="text-center font-comfortaa">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-lg uppercase mr-5">
          List of
          <span className="font-bold mx-2">{user?.username}'s</span>
          successful Calls
        </h1>
      </div>

      {error ? (
        <div>{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {calls && calls.map((c, idx) => <CallCard key={idx} call={c} />)}
        </div>
      )}
    </div>
  )
}

export default Call
