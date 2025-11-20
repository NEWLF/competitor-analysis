import React from "react";
import {useRouter} from 'next/router'
import {sso} from "../../remotes/legacy/auth/sso";
import {message} from "antd";
import styled from "@emotion/styled";

export const isAdmin = () => {
	return ['2180063', '2190019', '2220413', 'admin']
		.includes(sessionStorage.getItem('userId'))
}

export default function SSO() {
	const router = useRouter()

	React.useEffect(() => {
		if (!router.isReady) {
			return
		}

		const {p1, p2, p3, p4, p5} = router.query
		if (!p1 || !p2 || !p3 || !p4 || !p5) {
			message.error("인증에 실패했습니다.");
			return
		}

		sso({p1, p2, p3, p4, p5}).then(({token, userInfo}) => {
			if (token && userInfo) {
				sessionStorage.setItem('userId', userInfo[0].USER_ID)
				sessionStorage.setItem('userName', userInfo[0].USER_NAME)
				router.replace('/').then()
			} else {
				message.error("인증에 실패했습니다.");
			}
		}).catch((e) => {
			message.error("인증에 실패했습니다.");
		})
	}, [router.isReady])

	return (
		<Container>
			<LoadingWrap>
				<Spinner/>
				<span>데이터를 가져오는 중입니다.</span>
			</LoadingWrap>
		</Container>
	)
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: url("/images/desktop-blur.png") no-repeat center;
  -webkit-background-size: cover;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px
`

const Spinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

