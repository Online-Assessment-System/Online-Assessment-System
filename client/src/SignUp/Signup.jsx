import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import signup from './Signup.jpg';
import './Signup.css'
import CircularProgress from '@material-ui/core/CircularProgress';
const Signup = () => {
	const history = useNavigate();
	const [validField, setValidField] = useState({ emailId: 2, nameId: 2, phoneId: 2, passwordId: 2, cpasswordId: 2 });
	const [userDetails, setUserDetails] = useState({ email: "", name: "", phone: "", password: "", cpassword: "" });
	const setDetails = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUserDetails({ ...userDetails, [name]: value });
		handler(name, value);
	}
	const handler = (name, value) => {
		if (name === "email") {
			(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) ? insertSuccess(name + "Id") : insertError(name + "Id"));
		} else if (name === "name") {
			(value.length < 3 ? insertError(name + "Id") : insertSuccess(name + "Id"));
		} else if (name === "phone") {
			(/^\d{10}$/.test(value) ? insertSuccess(name + 'Id') : insertError(name + 'Id'));
		} else if (name === 'password') {
			(value.length < 8 ? insertError(name + "Id") : insertSuccess(name + "Id"));
		} else {
			(value !== document.getElementById('password').value ? insertError(name + "Id") : insertSuccess(name + "Id"));
		}
	}
	const insertError = (name) => {
		const data = document.getElementById(name);
		if (validField[name] === 1) {
			data.removeChild(data.lastElementChild);
			const node = document.createElement("i");
			node.classList.add("fa", "fa-exclamation-circle");
			data.appendChild(node);
			setValidField({ ...validField, [name]: 0 });
			const newName = name.substring(0, name.length - 2);
			const inp = document.getElementById(newName);
			inp.style.borderColor = "red";
		}
		else if (validField[name] === 2) {
			const node = document.createElement("i");
			node.classList.add("fa", "fa-exclamation-circle");
			data.appendChild(node);
			setValidField({ ...validField, [name]: 0 });
			const newName = name.substring(0, name.length - 2);
			const inp = document.getElementById(newName);
			inp.style.borderColor = "red";
		}
	}
	const insertSuccess = (name) => {
		const data = document.getElementById(name)
		if (validField[name] === 0) {
			data.removeChild(data.lastElementChild);
			const node = document.createElement("i");
			node.classList.add("fa", "fa-check-circle");
			data.appendChild(node);
			setValidField({ ...validField, [name]: 1 });
			const newName = name.substring(0, name.length - 2);
			const inp = document.getElementById(newName);
			inp.style.borderColor = "#ced4da";
		}
		else if (validField[name] === 2) {
			const node = document.createElement("i");
			node.classList.add("fa", "fa-check-circle");
			data.appendChild(node);
			setValidField({ ...validField, [name]: 1 });
			const newName = name.substring(0, name.length - 2);
			const inp = document.getElementById(newName);
			inp.style.borderColor = "#ced4da";
		}
	}
	const sendData = async (e) => {
		e.preventDefault();

		const { email, name, phone, password } = userDetails;
		const { emailId, nameId, phoneId, passwordId, cpasswordId } = validField;

		if (emailId !== 1) insertError("emailId");
		else if (nameId !== 1) insertError("nameId");
		else if (phoneId !== 1) insertError("phoneId");
		else if (passwordId !== 1) insertError("passwordId");
		else if (cpasswordId !== 1) insertError("cpasswordId");

		if (emailId + nameId + phoneId + passwordId + cpasswordId !== 5) return;

		document.getElementById("spin").classList.remove('spinner');
		const res = await fetch("/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, name, phone, password })
		});

		const data = await res.json();

		if (res.status === 400) {
			toast.error(data.message, {
				position: "top-center",
			});
			document.getElementById("spin").classList.add('spinner');
		}
		else {
			toast.success(data.message, {
				position: "top-center",
			});
			setTimeout(() => {
				history.push('./login');
			}, 3000);
		}
	}
	return (
		<>
			<div className="myContainer">
				<div className="login d-flex align-items-center">
					<div className="loginForm">
						<form method="POST">
							<h1 className="display-5"><strong>Sign Up</strong></h1>
							<div className="mb-3 mt-4 combine_field" id="emailId">
								<label htmlFor="email">
									<EmailIcon />
								</label>
								<input type="email" className="form-control" id="email" name="email" autoComplete="off" value={userDetails.email} onChange={setDetails} placeholder="Enter Your Email" />
							</div>
							<div className="mb-3 combine_field" id="nameId">
								<label htmlFor="name">
									<PersonIcon />
								</label>
								<input type="text" className="form-control" id="name" name="name" autoComplete="off" value={userDetails.name} onChange={setDetails} placeholder="Enter Your Name" required />
							</div>
							<div className="mb-3 combine_field" id="phoneId">
								<label htmlFor="phone">
									<PhoneAndroidIcon />
								</label>
								<input type="tel" className="form-control" id="phone" name="phone" autoComplete="off" value={userDetails.phone} onChange={setDetails} placeholder="Enter Your Phone Number" required />
							</div>
							<div className="mb-3 combine_field" id="passwordId">
								<label htmlFor="password">
									<LockOpenIcon />
								</label>
								<input type="password" className="form-control" id="password" name="password" autoComplete="off" value={userDetails.password} onChange={setDetails} placeholder="Enter Your Password" required />
							</div>
							<div className="mb-3 combine_field" id="cpasswordId">
								<label htmlFor="cpassword">
									<LockIcon />
								</label>
								<input type="password" className="form-control" id="cpassword" name="cpassword" autoComplete="off" value={userDetails.cpassword} onChange={setDetails} placeholder="Confirm Password" required />
							</div>
							<div className="combine_field">
								<button type="submit" className="btn btn-primary btn-lg mt-3 display-1 myBtn" onClick={sendData}>Register </button>
								<div className="spinner" id="spin">
									<CircularProgress size="25" />
								</div>
							</div>
						</form>
					</div>
					<div className="img">
						<img src={signup} alt="Login" />
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	)
}

export default Signup;