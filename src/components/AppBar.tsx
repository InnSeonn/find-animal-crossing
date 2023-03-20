import styled from 'styled-components'
import { MaxLayout } from './GlobalStyle';
import { FaBook, FaSearch, FaTrophy } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AppBarLayout = styled.nav`
	position: fixed;
	inset: auto auto 0 0;
	width: 100%;
	height: 80px;
	background-color: #fff;
`;
const AppBarList = styled.ul`
	${MaxLayout}
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding: 0 var(--padding-x);
	& > li {
		display: flex;
		align-items: center;
	}
`;
const AppBarLink = styled(NavLink)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 0 0.4em;
	font-size: 22px;
	&.active {
		color: var(--color-green);
	}
`;
const AppBarLinkText = styled.span`
	margin-top: 6px;
	font-size: 12px;
`;

export default function AppBar() {
	return (
		<AppBarLayout>
			<AppBarList>
				<li>
					<AppBarLink to='/book' className={({isActive}) => (isActive ? 'active' : '')}>
						<FaBook/><AppBarLinkText>도감</AppBarLinkText>
					</AppBarLink>
				</li>
				<li>
					<AppBarLink to='/search' className={({isActive}) => (isActive ? 'active' : '')}>
						<FaSearch/><AppBarLinkText>찾기</AppBarLinkText>
					</AppBarLink>
				</li>
				<li>
					<AppBarLink to='/rank' className={({isActive}) => (isActive ? 'active' : '')}>
						<FaTrophy/><AppBarLinkText>랭킹</AppBarLinkText>
					</AppBarLink>
				</li>
			</AppBarList>
		</AppBarLayout>
	)
}