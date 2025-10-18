import { useEffect, useState, useCallback } from 'react';
import useWebSocketHook, { ReadyState } from 'react-use-websocket';
import { fetcher } from '@/+shared/libs';
import { showToast } from '@/+shared/functions';
import { useAuthStore } from '@/+shared/stores';

interface WebSocketMessage {
  id: number;
  appid: number;
  message: string;
}

export function useWebSocket() {
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const [messageHistory, setMessageHistory] = useState<WebSocketMessage[]>([]);
  
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const competitionId = useAuthStore((state: any) => state.competitionId);

  // WebSocket 연결 설정
  const { sendMessage, lastMessage, readyState } = useWebSocketHook(
    socketUrl,
    {
      onOpen: () => {
        // WebSocket 연결됨
      },
      onClose: () => {
        // WebSocket 연결 해제됨
      },
      onError: (event: Event) => {
        console.error('WebSocket error:', event);
      },
      shouldReconnect: () => {
        // 자동 재연결 설정
        return true;
      },
      reconnectAttempts: 5,
      reconnectInterval: 3000,
    }
  );

  // WebSocket URL 설정
  const connectWebSocket = useCallback(async () => {
    if (!isAuthenticated || !competitionId) {
      return;
    }

    try {
      // 웹소캣 주소 가져오기
      const configResponse = await fetcher({
        url: '/config',
        method: 'get'
      });

      // competitions에서 messageToken 가져오기
      const competitionsResponse = await fetcher({
        url: `/participant/competitions/${competitionId}`,
        method: 'get'
      });

      if (configResponse.resultCode === 200 && competitionsResponse.resultCode === 200) {
        const websocketUrl = configResponse.result.data[0].value;
        const streamToken = (competitionsResponse.result as any)?.data?.streamToken;

        if (websocketUrl && streamToken) {
          const wsUrl = `wss://${websocketUrl}/stream?token=${streamToken}`;
          setSocketUrl(wsUrl);
        } else {
          console.warn('WebSocket URL 또는 토큰이 비어있습니다.');
        }
      }
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }, [isAuthenticated, competitionId]);

  // 메시지 처리
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data: WebSocketMessage = JSON.parse(lastMessage.data);
        setMessageHistory((prev) => prev.concat(data));
        handleWebSocketMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  const handleWebSocketMessage = (data: WebSocketMessage) => {
    try {
      // message 필드가 JSON 문자열이므로 파싱
      const messageContent = JSON.parse(data.message);
      const { title, content } = messageContent;
      
      // title에 따라 다른 알림 표시
      if (data.title === 'announcement') {
        showToast(`📢 ${title}: ${content}`, 'active');
      } else {
        showToast(`📨 ${title}: ${content}`, 'active');
      }
    } catch (error) {
      console.error('Failed to parse message content:', error);
      // 파싱 실패 시 기본 메시지 표시
      showToast(`📨 ${data.title}: ${data.message}`, 'active');
    }
  };

  // 연결 상태에 따른 처리
  useEffect(() => {
    if (isAuthenticated) {
      connectWebSocket();
    } else {
      setSocketUrl(null);
    }
  }, [isAuthenticated, connectWebSocket]);

  // 연결 상태
  const connectionStatus: string = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState] || 'Unknown';

  return {
    isConnected: readyState === ReadyState.OPEN,
    connectionStatus,
    messageHistory,
    sendMessage,
    connectWebSocket,
    disconnectWebSocket: () => setSocketUrl(null)
  };
}
