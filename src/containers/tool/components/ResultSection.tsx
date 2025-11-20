import { colors } from "@boxfoxs/bds-common";
import { Button, Divider, Flex, Spacing, Text } from "@boxfoxs/bds-web";
import { useState } from "react";
import { Result } from "types/Result";

import { List } from "antd";

export function ResultSection({
  data,
  prevData,
  list,
}: {
  data?: Result;
  prevData?: Result;
  list: { id: number; content: string }[];
}) {
  const [selected, setSelected] =
    useState<[number, string, string, number[]]>();
  const [prevItem, setPrevItem] =
    useState<[number, string, string, number[]]>();
  const [reGenerated, setRegenerated] = useState<Result>();

  const reGenerate = async () => {
    const res = await requestFirst(
      prevData ? combiningPrompt(prevData) : defaultPrompt,
      data?.source || list
    );
    const result = prevData ? combineResults(prevData, res) : res;
    console.log(result);
    setRegenerated(result);
  };

  const result = reGenerated || data;

  return (
    <div>
      <Button onClick={reGenerate}>다시 생성</Button>
      {result?.usage && (
        <Flex.CenterVertical style={{ paddingBottom: "12px" }}>
          <Text size="xs">입력 토큰 수 : {result.usage.prompt_tokens}</Text>
          <Spacing width={12} />
          <Text size="xs">출력 토큰 수 : {result.usage.completion_tokens}</Text>
          <Spacing width={12} />
          <Text size="xs">비용 : ${result.cost || "-"}</Text>
        </Flex.CenterVertical>
      )}
      <Text weight="bold" size="lg">
        총평
      </Text>
      {result?.summary}
      <Divider
        height={1}
        width="100%"
        marginVertical={24}
        color={colors.gray300}
      />
      <Text weight="bold" size="lg">
        장점
      </Text>
      <Spacing height={12} />
      <List
        itemLayout="horizontal"
        dataSource={result?.pros || []}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <a
                onClick={() => {
                  setSelected(item);
                  setPrevItem(prevData?.pros[index]);
                }}
              >
                detail
              </a>,
            ]}
          >
            <List.Item.Meta
              title={item[1]}
              description={<div>{item[2]}</div>}
            />
          </List.Item>
        )}
      />
      <Divider
        height={1}
        width="100%"
        marginVertical={24}
        color={colors.gray300}
      />
      <Text weight="bold">단점</Text>
      <Spacing height={12} />
      <List
        itemLayout="horizontal"
        dataSource={result?.cons}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <a
                onClick={() => {
                  setSelected(item);
                  setPrevItem(prevData?.cons[index]);
                }}
              >
                detail
              </a>,
            ]}
          >
            <List.Item.Meta
              title={item[1]}
              description={<div>{item[2]}</div>}
            />
          </List.Item>
        )}
      />
      {!!selected && (
        <DetailModal
          data={selected}
          prevData={prevItem}
          list={list}
          onClose={() => setSelected(undefined)}
        />
      )}
    </div>
  );
}

import { Modal } from "antd";
import { combiningPrompt, defaultPrompt } from "constants/defaultPrompt";
import { combineResults, requestFirst } from "remotes/chat-gpt/request";

function DetailModal({
  data,
  prevData,
  list,
  onClose,
}: {
  data: [number, string, string, number[]];
  prevData?: [number, string, string, number[]];
  list: { id: number; content: string }[];
  onClose: () => void;
}) {
  // const errorIds = prevData?.[2].filter((i) => !data[2].includes(i));

  return (
    <Modal open onClose={onClose} onCancel={onClose} onOk={onClose}>
      {/* {!!prevData && (
        <div style={{ display: "flex" }}>
          <Text size="xxs">이전 리뷰 : {prevData[2].length} 개</Text>
          <Spacing width={24} />
          <Text size="xxs">현재 리뷰 : {data[2].length} 개</Text>
          <Spacing width={24} />
          <Text size="xxs">
            누락된 리뷰 : {errorIds.length ? errorIds.join() : "없음"}
          </Text>
        </div>
      )} */}
      <List
        itemLayout="horizontal"
        dataSource={data[3]}
        pagination={{ pageSize: 5 }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item}
              description={list.find((i) => i.id === item)?.content ?? "-"}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
}
