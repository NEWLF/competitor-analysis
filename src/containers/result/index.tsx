import { colors } from "@boxfoxs/bds-common";
import { Button, Divider, Flex, Spacing, Text } from "@boxfoxs/bds-web";
import { Path } from "@boxfoxs/next";
import { Card, List } from "antd";
import { combiningPrompt, defaultPrompt } from "constants/defaultPrompt";
import { ResultSection } from "@/containers/tool/components/ResultSection";
import React from "react";
import { requestFirst } from "remotes/chat-gpt/request";
import { Result } from "types/Result";
import { RESULT_DATA1 } from "./constants/data1";
import { counts, results } from "./constants/result";
import { startTunning } from "remotes/chat-gpt/startTunning";

export default function SummaryPage() {
  const id = Path.get("id");
  const result: {
    data1?: Result;
    data2?: Result;
    data3?: Result;
    list: { id: number; content: string }[];
  } = results[id] ?? RESULT_DATA1;

  const reGenerate1 = async () => {
    const res = await requestFirst(defaultPrompt, result.list);
    console.log(res);
  };

  const reGenerate2 = async () => {
    const res = await requestFirst(
      defaultPrompt,
      result.list.slice(0, counts[id][1] || result.list.length / 2)
    );
    console.log(res);
  };

  const reGenerate3 = async () => {
    const res = await requestFirst(
      combiningPrompt(result.data2),
      result.list.slice(
        counts[id][1] || result.list.length / 2,
        counts[id][2] || result.list.length / 2
      )
    );
    console.log(res);
  };

  const tunning = async () => {
    startTunning();
    // const systemPrompt = defaultPrompt;
    // const dataset = Object.values(results)
    //   .map((i) => ({
    //     user: JSON.stringify(i.list),
    //     result: JSON.stringify(i.data1),
    //   }))
    //   .map((i) => ({
    //     messages: [
    //       { role: "system", content: systemPrompt },
    //       { role: "user", content: i.user },
    //       { role: "assistant", content: i.result },
    //     ],
    //   }));
    // console.log(dataset.map((i) => JSON.stringify(i)).join("\n"));
  };

  if (!id || !counts[id]) {
    return <div />;
  }

  return (
    <div style={{ padding: "56px" }}>
      <Flex.CenterVertical>
        <Text size="2xl" weight="bold">
          STCL : {id}
        </Text>
        {/* <Spacing flex={1} />
        <Button onClick={reGenerate1}>Re Generate1</Button>
        <Button onClick={reGenerate2}>Re Generate2</Button>
        <Button onClick={reGenerate3}>Re Generate3</Button> */}
      </Flex.CenterVertical>
      <Card>
        <Text size="2xl" weight="bold">
          {counts[id][0]} 개
        </Text>
        <Spacing height={8} />
        <ResultSection data={result.data1} list={result.list} />
      </Card>
      {!!result.data2 && (
        <React.Fragment>
          <Divider
            height={1}
            width="100%"
            color={colors.gray300}
            marginVertical={30}
          />
          <Card>
            <Text size="2xl" weight="bold">
              {counts[id][1]} 개
            </Text>
            <Spacing height={8} />
            <ResultSection data={result.data2} list={result.list} />
          </Card>
        </React.Fragment>
      )}
      {!!result.data3 && (
        <React.Fragment>
          <Divider
            height={1}
            width="100%"
            color={colors.gray300}
            marginVertical={30}
          />
          <Card>
            <Text size="2xl" weight="bold">
              {counts[id][1]}개 요약본 + {counts[id][2]}개 추가
            </Text>
            <Spacing height={8} />
            <ResultSection
              data={result.data3}
              prevData={result.data2}
              list={result.list}
            />
          </Card>
        </React.Fragment>
      )}
      <Divider
        height={1}
        width="100%"
        color={colors.gray300}
        marginVertical={30}
      />
      <Card>
        <Text size="2xl" weight="bold">
          리뷰 데이터
        </Text>
        <Spacing height={8} />
        <List
          itemLayout="horizontal"
          dataSource={result.list}
          renderItem={(item: { id: number; content: string }) => (
            <List.Item>
              <List.Item.Meta title={item.id} description={item.content} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
