# 구현해야하는 것
- [x] 사용자가 들어왔을 때 한칸 늘어나는 것
- [x] 화면 크기에 따라서 보이는 숫자 바뀜
- [ ] possiblePlayer와 activePlayer를 관리
- [x] activePlayer를 조정

## 버그

- [x] 
  - 끝에 달했을 때 화면이 늘어나면 player가 안늘어남
  - maxVideo가 늘어났을 때 st+maxVideo top에 닿아있는 상태임.
  - 그러면 maxVideo가 늘어났을 때 st+mavVideo가 .length>면, st + st+maxVideo - length하면 되려나

  - start + maxVide > length.
    - start = length - maxVideo를 해야함.
    - 성능이슈?
    - activeIndex = {start, over} 

    - maxVideo의 useEffect로 start값을 결정.
    - 안됨. length도 필요.
    - 그러면 기존 useEffect랑 겹침.

  - hack.
    - start를 따로 관리한다면?
    - start 대신 pivot느낌.
