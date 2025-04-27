import { Tabs } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

const Demo = () => {
    return (
      <Tabs.Root>
        <Tabs.List>
            <Tabs.Trigger value="tinnoibat">
                Tin noi bat
            </Tabs.Trigger>
            <Tabs.Trigger value="tintuc">
                Tin tuc
            </Tabs.Trigger>
            <Tabs.Trigger value="tphcm">
                TPHCM
            </Tabs.Trigger>
            <Tabs.Trigger value="hn">
                HN
            </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tinnoibat">Desciotion TIn noi bat</Tabs.Content>
        <Tabs.Content value="tintuc">Desciotion TIn tuc</Tabs.Content>
        <Tabs.Content value="tphcm">Desciotion TPHCM</Tabs.Content>
        <Tabs.Content value="hn">Desciotion HN</Tabs.Content>
      </Tabs.Root>
    )
  };

export default Demo;