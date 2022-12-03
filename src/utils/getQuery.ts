import { useQueryClient, UseQueryResult } from "react-query";

export default <Q>(key: string) => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData(key) as UseQueryResult<Q, unknown>;
};