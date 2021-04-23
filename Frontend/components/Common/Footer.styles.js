import styled from "styled-components";

export const SignUpContainer = styled.div`
  background-color: #314869;
  height: 400px;
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 50px 0 0;
  justify-content: space-around;

  & > div {
    align-self: center;
    margin: 0 auto;
  }
`;

export const FooterContainer = styled.footer`
  max-width: 100%;
  position: sticky;
  padding: 50px 0 0;
  top: 100%;
  background-color: rgb(17, 17, 17);
  color: #fefefe;
  min-height: 400px;
`;

export const SubFooter = styled.div`
    display: flex;
  justify-content: space-between;
  position: sticky;
  top: 100%;
  padding: 10px 20px;
  background-color: rgb(8,8,8);
  color: white;
  &>div{
    display: flex;
    justify-content: space-around;
    gap: 20px;
  }

  @media(max-width:600px) {
    flex-wrap: wrap;
    &>p{
      width: 100%;
      text-align: start;
    }
    &>div{
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 20px 0;
      p{
        margin:0;
      }
    }
  }
`

export const FooterContent = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 10px 30px 30px;
  flex-wrap: wrap;
  box-sizing: border-box;
  h3{
    color: white;
  }
  a,p{
    color: #8e8e8e;
    width: fit-content;
    &:hover{
      color: white;
      
    }
  }
  &>div{
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 120px;
    text-align: initial;
    flex-grow: 1;
  }
`