interface ErrorMsgProp {
  errorMsg: string[]
}

const Alert: React.FC<ErrorMsgProp> = ({ errorMsg }) => {
  return (
    <div role="alert" className="alert alert-error">
      <ul className="pl-5 mt-2 list-disc">
        {errorMsg.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  )
}

export default Alert
