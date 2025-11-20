import styled from "@emotion/styled";
import React from "react";
import {login} from "../../remotes/legacy";
import {message} from "antd";
import {useRouter} from "next/router";

export default function Login() {
	const router = useRouter()
	const [clickCount, setClickCount] = React.useState(0)

	const handleSubmit = async (e) => {
		e.preventDefault();
		const {id, password} = e.target.elements
		try {
			const data = await login({
				id: id.value,
				password: password.value
			})
			if (!data || !data.USER_ID) {
				message.error("인증에 실패했습니다.");
				return
			}
			const { USER_ID, USER_NAME } = data
			sessionStorage.setItem('userId', USER_ID)
			sessionStorage.setItem('userName', USER_NAME)
			router.replace('/').then()
		} catch (e) {
			message.error("인증에 실패했습니다.");
		}
	}

	return (
		<LoginContainer>
			<div className="contents-wrap">
				<form className="login-form" onSubmit={handleSubmit}>
					<h1>LF EIS+ Login</h1>
					<div className="form">
						<input name="id" type="text" placeholder="아이디"/>
						<input name="password" type="password" placeholder="비밀번호" autoComplete="on"/>
						<button type="submit">
							<LockIcon/>
							로그인
						</button>
					</div>
				</form>
				<div className="login-logo" onClick={() => setClickCount(value => value + 1)}/>
			</div>
		</LoginContainer>
	)
}

const LoginContainer = styled.div`
	width: 100%;
	height: 100vh;
	background: #f5f6fa;

	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;

	.contents-wrap {
		position: relative;
		max-width: 380px;
		width: 100%;
	}

	.notice-use-portal {
		width: 100%;
		height: 230px;

		background: #ffffff;
		border-radius: 20px;
		padding: 24px;

		box-shadow:
			0 8px 20px rgba(0, 0, 0, 0.05),
			0 2px 4px rgba(0, 0, 0, 0.03);

		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;

		h2 {
			font-size: 17px;
			line-height: 1.5;
			color: #555;
			font-weight: 600;
		}
	}

	.login-form {
		background: #fff;
		border-radius: 14px;
		padding: 32px 28px 40px;
		width: 100%;

		box-shadow:
			0 12px 28px rgba(0, 0, 0, 0.08),
			0 4px 8px rgba(0, 0, 0, 0.04);

		animation: fadeIn .35s ease-out;
		text-align: center;

		h1 {
			margin: 0 0 28px;
			font-size: 22px;
			font-weight: 700;
			color: #111;
		}

		.form {
			display: flex;
			flex-direction: column;
			gap: 14px;
		}

		input {
			width: 100%;
			height: 42px;

			border: 1px solid #dcdde1;
			border-radius: 8px;

			padding: 0 12px;
			font-size: 14px;
			background: #fafafa;

			&:focus {
				outline: none;
				border-color: #222;
				background: #fff;
			}

			&::placeholder {
				color: #a5a5a5;
			}
		}

		button {
			width: 100%;
			height: 44px;
			margin-top: 10px;

			border: none;
			border-radius: 8px;
			font-size: 14px;
			font-weight: 600;

			background: #111;
			color: #fff;
			cursor: pointer;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;

			transition: background 0.15s ease;

			&:hover {
				background: #000;
			}

			svg {
				width: 12px;
			}
		}
	}

	.login-logo {
		background: url("/images/eis-logo.svg") no-repeat center;
		background-size: contain;
		width: 56px;
		height: 56px;

		position: absolute;
		bottom: -70px;
		left: 50%;
		transform: translateX(-50%);

		cursor: pointer;
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	}

	@keyframes popup {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;


export const LockIcon = () => {
	return (
		<svg
			id="Layer_1"
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 126.57 154.09"
		>
			<defs></defs>
			<rect
				className="cls-1"
				x="5.58"
				y="59.01"
				width="114.65"
				height="90.8"
				rx="11.85"
			/>
			<path
				className="cls-2"
				d="M31.34,68.44V40.09c0-15.73,13.8-28.47,30.82-28.47h1.49c17,0,30.82,12.74,30.82,28.47V68.44"
			/>
		</svg>
	)
}
