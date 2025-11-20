import React from "react";
import {useRouter} from "next/router";

export function withAuth(Component) {
	return function WithAuthComponent() {
		const router = useRouter()
		const [isAuth, setIsAuth] = React.useState(false)

		React.useEffect(() => {
			const userId = sessionStorage.getItem('userId')
			if (!userId) {
				router.replace('login')
			} else {
				setIsAuth(true)
			}
		}, [])

		return isAuth && <Component />
	}
}
