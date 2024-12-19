export function createResource(promiseFn) {
    let status = "pending";
    let result = null;
    let error = null;

    const suspender = promiseFn()
        .then((data) => {
            status = "success";
            result = data;
        })
        .catch((err) => {
            status = "error";
            error = err;
        });

    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw error;
            }
            return result;
        },
    };
}
