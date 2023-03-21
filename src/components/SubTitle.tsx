import styled from 'styled-components'

const SubTitleBox = styled.div`
  font-size: var(--font-size-xl);
  line-height: 1.2;
`;

export default function SubTitle({ text }: { text: string }) {
  const str = text.replace(/<br>/ig, '\n'); //대소문자 구분없이 전체에서

  return (
    <SubTitleBox><pre>{str}</pre></SubTitleBox>
  )
}