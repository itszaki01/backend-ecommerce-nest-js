export default function (id: string) {
    return RegExp(/^[a-f\d]{24}$/i).test(id);
}
