const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [otpTimer, setOtpTimer] = useState(null)
  const [opt, setOpt] = useState(null)
  const intervalRef = useRef(null)

  const generateOpt = () => {
    setOpt(Math.floor(Math.random() * 1000000))
  }

  const handleClick = () => {
    generateOpt()
    let counter = 5
    setOtpTimer(counter)

    intervalRef.current = setInterval(() => {
      counter -= 1
      setOtpTimer(counter)

      if (counter === 0) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, 1000)
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{
        opt ? opt : "Click 'Generate OTP' to get a code"
      }</h2>
      <p id="otp-timer" aria-live="assertive">
        {(otpTimer === 0) 
          ? "OTP expired. Click the button to generate a new OTP." 
          : otpTimer !== null ? `Expires in: ${otpTimer} seconds` : ""}
      </p>
      <button 
        id="generate-otp-button"
        onClick={handleClick}
        disabled={otpTimer > 0}
      >Generate OTP</button>
    </div>
  )
};