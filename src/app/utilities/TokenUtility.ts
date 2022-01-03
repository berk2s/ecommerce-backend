import axios from "axios";
import { Jwks } from "../models/Jwks";
import { API } from "./api-endpoints";
import jwkToPem from "jwk-to-pem";

export abstract class TokenUtility {
  /**
   * Initializes public key when application has been started
   */
  public static async initilaizePublicKey(): Promise<void> {
    try {
      const jwkRequest = await axios.get(API.JWKS_URL);

      const publicKey: string = jwkToPem(jwkRequest.data.keys[0]);

      TokenUtility.savePublicKey(publicKey);

      console.log(`Public key`, publicKey);
    } catch (e: any) {
      throw new Error("Public keys can not be initialized!");
    }
  }

  /**
   * Gets public key from global object
   */
  public static get publicKey(): string {
    return global.publicKey as string;
  }

  /**
   * Saves public key into global object
   * @param publicKey key that will be saved
   */
  public static savePublicKey(publicKey: string): void {
    global.publicKey = publicKey;
  }
}
