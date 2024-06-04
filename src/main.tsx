import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import {
  Image,
  Text,
  Container,
  DefaultProperties,
  MetalMaterial,
  Root,
  setPreferredColorScheme,
} from "@react-three/uikit";
import { Card, CardContent } from "./components/default/card";
import { Environment, OrbitControls } from "@react-three/drei";
import { Defaults } from "./components/default/theme";
import sponsors from "./data.json";

setPreferredColorScheme("dark");

const columns = Math.ceil(sponsors.length / 4);

createRoot(document.getElementById("root")!).render(
  <Canvas
    camera={{ position: [0, 0, columns * 2.5] }}
    style={{ position: "absolute", inset: 0 }}
  >
    <Environment preset="forest" />
    <ambientLight />
    <directionalLight intensity={10} color="blue" position={[100, 100, 100]} />
    <directionalLight intensity={10} color="red" position={[-100, 100, 100]} />
    <directionalLight
      intensity={10}
      color="green"
      position={[100, -100, 100]}
    />
    <directionalLight
      intensity={10}
      color="yellow"
      position={[-100, -100, 100]}
    />
    <Root>
      <Defaults>
        <Container
          onSizeChange={() => console.log("ready")}
          flexWrap="wrap"
          maxWidth={1000}
          flexDirection="row"
          gap={64}
        >
          {sponsors.map(({ description, logo, name }) => (
            <Card
              key={name}
              width="100%"
              maxWidth={200}
              panelMaterialClass={MetalMaterial}
              borderWidth={4}
              borderBend={0.5}
              borderOpacity={0}
            >
              <CardContent flexDirection="column" marginTop={16} gap={16}>
                <Container
                  height={80}
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Image
                    src={logo}
                    width={80}
                    marginLeft="auto"
                    marginRight="auto"
                    overflow="hidden"
                    borderRadius={8}
                    flexDirection="column"
                  ></Image>
                </Container>
                <Container />
                <DefaultProperties textAlign="center">
                  <Container flexDirection="column" gapRow={4}>
                    <Text
                      fontSize={18}
                      fontWeight={700}
                      lineHeight={28}
                      flexDirection="column"
                    >
                      {name}
                    </Text>
                    <Text
                      fontSize={14}
                      lineHeight={20}
                      color="rgb(107,114,128)"
                      dark={{ color: "rgb(156,163,175)" }}
                      flexDirection="column"
                    >
                      {description}
                    </Text>
                  </Container>
                </DefaultProperties>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Defaults>
    </Root>
    <OrbitControls />
  </Canvas>
);
