interface ErrorMsgProp {
  errorMsg: string[]
  type: string
}

const Alert: React.FC<ErrorMsgProp> = ({ errorMsg, type }) => {
  let errorType: string = "alert-error"
  if (type === "success") {
    errorType = "alert-success"
  }

  return (
    <div role="alert" className={`alert ${errorType}`}>
      <ul className="pl-5 mt-2 list-disc">
        {errorMsg.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  )
}

export default Alert
