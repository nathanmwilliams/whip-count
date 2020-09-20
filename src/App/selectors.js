export const getSenatorsByStatus = (allSenators) => (
    allSenators.reduce((acc, cur) => {
        const statusKey = cur.status
        if (!acc[statusKey]) {
            acc[statusKey] = [cur]
        } else {
            acc[statusKey].push(cur)
        }
        return acc;
    }, {})
)