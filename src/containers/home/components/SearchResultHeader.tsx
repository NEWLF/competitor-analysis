import {colors} from "@boxfoxs/bds-common";
import { Divider } from "@boxfoxs/bds-web";
import {inDesktop, Spacing, Text} from "@boxfoxs/bds-web";
import styled from "@emotion/styled";
import {format, parse} from "date-fns";
import {useLastUpdateDate} from "hooks/useStatistics";
import {pressableStyle} from "utils/style";
import {useCustomerStatTable} from "./customer-stat";

export function SearchResultHeader() {
	const lastUpdateDate = useLastUpdateDate();
	const openStat = useCustomerStatTable();

	return (
		<Container>
			<Spacing flex={2}/>
			<CustomerButton onClick={openStat} color={colors.gray900}>
				EXCEL DOWN
			</CustomerButton>
			<Text size="xxxs" color={colors.gray800} center weight="extrabold">
				Last updated :{" "}
				{lastUpdateDate?.data?.ANAL_DATE ? format(parse(lastUpdateDate?.data?.ANAL_DATE, "yyyyMMdd", new Date()), "yyyy.MM.dd") : ""}
			</Text>

		</Container>
	);
}

const Container = styled.div`
  padding: 0px 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 4px;
  ${inDesktop(`
  	padding: 15px 20px;
    flex-direction: row;
  `)}
`;

const CustomerButton = styled.button`
	background: ${colors.gray900};
	padding: 6px 13px;
	margin-right: 10px;
	border-radius: 4px;
	font-size: 11px;
	color: ${colors.white};
	${pressableStyle.opacity()};
`;


