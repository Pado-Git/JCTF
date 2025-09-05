import MaxWidthContainer from './MaxWidthContainer';

// 기본 사용법
export function BasicExample() {
  return (
    <MaxWidthContainer>
      <h1>이 내용은 최대 1520px 너비로 제한됩니다</h1>
      <p>화면이 1520px보다 클 때는 중앙에 배치되고 양쪽에 여백이 생깁니다.</p>
    </MaxWidthContainer>
  );
}

// 커스텀 태그 사용
export function CustomTagExample() {
  return (
    <MaxWidthContainer as="main" innerProps={{ as: 'section' }}>
      <h1>main 태그로 감싸고, section으로 내부 컨테이너 사용</h1>
    </MaxWidthContainer>
  );
}

// 추가 노드 사용
export function AddonNodesExample() {
  return (
    <MaxWidthContainer
      addonNodes={{
        beforebegin: <div className="bg-red-500 h-4">상단 추가 요소</div>,
        afterend: <div className="bg-blue-500 h-4">하단 추가 요소</div>
      }}
    >
      <h1>메인 콘텐츠</h1>
    </MaxWidthContainer>
  );
}

// 스타일 커스터마이징
export function StyledExample() {
  return (
    <MaxWidthContainer 
      className="bg-gray-100 py-8"
      innerProps={{ 
        className: "bg-white rounded-lg shadow-lg p-6" 
      }}
    >
      <h1>스타일이 적용된 컨테이너</h1>
    </MaxWidthContainer>
  );
}
