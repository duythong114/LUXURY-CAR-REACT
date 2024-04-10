import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import './Register.scss';
import { useDispatch, useSelector } from 'react-redux'
import { createNewUser } from '../../slices/userSlice'
import { useHistory } from "react-router-dom";

const Register = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoading = useSelector(state => state.user.isLoading)
    const toastId = useRef()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [gender, setGender] = useState("")
    const [groupId, setGroupId] = useState("")

    const checkValidateInput = () => {
        let arrInput = [email, password, confirmPassword, firstName, lastName, address, phoneNumber, gender, groupId]
        let arrInputName = ['email', 'password', 'confirmPassword', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!arrInput[i]) {
                toast.error("Missing parameter: " + arrInputName[i])
                return false
            }
        }
        return true
    }

    const checkConfirmPassword = () => {
        if (!(password === confirmPassword)) {
            toast.error("Your confirmPassword is incorrect")

            return false
        }
        return true
    }

    const checkLengthPassword = () => {
        if (!(password.length >= 8)) {
            toast.error("Your password is too short")

            return false
        }
        return true
    }

    const checkValidEmail = () => {
        let regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regx.test(email)) {
            toast.error("Your email address is not valid")

            return false
        }
        return true
    }

    const handleRegisterBtn = async () => {
        let validInput = checkValidateInput()
        if (validInput) {
            let validEmail = checkValidEmail()
            if (validEmail) {
                let validPassword = checkLengthPassword()
                if (validPassword) {
                    let validConfirmPassword = checkConfirmPassword()
                    if (validConfirmPassword) {
                        let userData = { email, password, confirmPassword, firstName, lastName, address, phoneNumber, gender, groupId }
                        let response = await dispatch(createNewUser(userData))

                        // check error
                        if (response
                            && response.payload
                            && response.payload.response
                            && response.payload.response.data
                            && response.payload.response.data.errorCode !== 0
                        ) {
                            // update toast
                            toast.update(toastId.current,
                                {
                                    render: `${response.payload.response.data.errorMessage}`,
                                    type: toast.TYPE.ERROR,
                                    autoClose: 2000,
                                })
                        }

                        if (response && response.payload && response.payload.errorCode === 0) {
                            // update toast
                            toast.update(toastId.current,
                                {
                                    render: `${response.payload.errorMessage}`,
                                    type: toast.TYPE.SUCCESS,
                                    autoClose: 2000,
                                })

                            setEmail("")
                            setPassword("")
                            setConfirmPassword("")
                            setAddress("")
                            setFirstName("")
                            setLastName("")
                            setPhoneNumber("")
                            setGender("")
                            setGroupId("")
                            history.push('/login')
                        }
                    }
                }
            }
        }
    }

    // initital toast 
    if (isLoading === true) {
        toastId.current = toast.warn("Data is loading...", { autoClose: false })
    }

    return (
        <div className='register-background'>
            <div className='container'>
                <div className='row'>
                    <div className='col-4'></div>
                    <div className='register-container col-4'>
                        <div className="register-content row">
                            <form className="row g-3">
                                <div className='col-12 register-title'>REGISTER A NEW ACCOUNT</div>
                                <div className="col-12">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        id='inputEmail'
                                        type="email"
                                        className="form-control"
                                        placeholder="example@gmail.com" />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="inputPassword">Password</label>

                                    <div className='input-password'>
                                        <input
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            id='password'
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder='Enter your password'
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                        </span>
                                    </div>

                                </div>
                                <div className="col-12">
                                    <label htmlFor="inputConfirmPassword">Confirm Password</label>

                                    <div className='input-password'>
                                        <input
                                            value={confirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            id='inputConfirmPassword'
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder='Confirm your Password'
                                        />
                                        <span
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            <i className={showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="inputFirstName">First name</label>
                                    <input
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        id='inputFirstName' type="text"
                                        className="form-control"
                                        placeholder="First name" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="inputLastName">Last name</label>
                                    <input
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                        id='inputLastName' type="text"
                                        className="form-control"
                                        placeholder="Last name" />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                        id='inputAddress' type="text"
                                        className="form-control"
                                        placeholder="1234 Main St" />
                                </div>

                                <div className="col-4">
                                    <label htmlFor="inputPhoneNumber">Phone number</label>
                                    <input
                                        value={phoneNumber}
                                        onChange={(event) => setPhoneNumber(event.target.value)}
                                        id='inputPhoneNumber' type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="inputGender">Gender</label>
                                    <select
                                        value={gender}
                                        onChange={(event) => setGender(event.target.value)}
                                        id='inputGender'
                                        className="form-select"
                                    >
                                        <option hidden></option>
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="inputGroupId">Group</label>
                                    <select
                                        value={groupId}
                                        onChange={(event) => setGroupId(event.target.value)}
                                        id='inputGroupId'
                                        className="form-select"
                                    >
                                        <option hidden></option>
                                        <option value="1">Worker</option>
                                        <option value="2">Client</option>
                                        <option value="3">Manager</option>
                                    </select>
                                </div>
                                <div className='col-12 mt-3'>
                                    <button
                                        onClick={() => handleRegisterBtn()}
                                        className='customized-btn' type='button'
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-4'></div>
                </div>
            </div>
        </div>
    )
}

export default Register;