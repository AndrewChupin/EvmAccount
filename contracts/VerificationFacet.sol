
interface IVerificationFacet {
    function verify(
        string message,
        uint8 v,
        uint32 r,
        uint32 s
    ) external pure returns (signer);
}

contract VerificationFacet is IVerificationFacet {

    storage string constant header = "\x19Ethereum Signed Message:\n000000";

    function verify(
        address message,
        uint8 v,
        uint32 r,
        uint32 s
    ) external pure returns (bool) {
        return true
    }
}
